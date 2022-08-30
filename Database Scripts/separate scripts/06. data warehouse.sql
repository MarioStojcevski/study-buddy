-- ############################### DATA WAREHOUSE ###############################
-- ##############################################################################

drop schema if exists warehouse;
create schema warehouse;

-- date dimension
drop table if exists warehouse.dim_date;
create table warehouse.dim_date
(
  date_dim_id              int not null,
  date_actual              date not null,
  day_name                 varchar(9) not null,
  day_of_week              int not null,
  day_of_month             int not null,
  day_of_quarter           int not null,
  day_of_year			         int not null,
  month_actual             int not null,
  month_name               varchar(9) not null,
  year_actual              int not null,
  mmyyyy                   char(6) not null,
  mmddyyyy                 char(10) not null
);

alter table warehouse.dim_date add constraint 
	d_date_date_dim_id_pk primary key (date_dim_id);

create index d_date_date_actual_idx
  on warehouse.dim_date(date_actual);

insert into warehouse.dim_date
select to_char(datum, 'yyyymmdd')::int as date_dim_id,
   datum as date_actual,
   to_char(datum, 'TMDay') as day_name,
   extract(ISODOW from datum) as day_of_week,
   extract(day from datum) as day_of_month,
   datum - date_trunc('quarter', datum)::date + 1 as day_of_quarter,
   extract(DOY from datum) as day_of_year,
   extract(month from datum) as month_actual,
   to_char(datum, 'TMMonth') as month_name,
   extract(year from datum) as year_actual,
   to_char(datum, 'mmyyyy') as mmyyyy,
   to_char(datum, 'mmddyyyy') as mmddyyyy
from (select '1970-01-01'::date + sequence.day as datum
      from generate_series(0, 29219) as sequence (day)
      group by sequence.day) DQ
order by 1;

select * from warehouse.dim_date dd;

-- course dimension
drop table if exists warehouse.dim_course;
create table warehouse.dim_course(
	courseid					int				not null,
	course_name					varchar			not null,
	points						numeric(5,2) 	not null,
	price						numeric(5,2) 	not null,
	category_name				varchar			not null,
	number_of_assignments		int,
	number_of_recommendations	int
);

-- student dimension
drop table if exists warehouse.dim_student;
create table warehouse.dim_student(
	studentid								int				not null,
	firstName								varchar			not null,
	lastName								varchar			not null,
	"age"									numeric(3,0),
	sex										char(1),
	points									numeric(5,2) 	not null,
	number_of_recommendations_received		int,
	number_of_recommendations_offered		int,
	average_grade							numeric(3,2),
	number_of_certificates_received			int
);

-- fact table
drop table if exists warehouse.fact_table;
create table warehouse.fact_table(
	course_id									int,
	student_id									int,
	total_revenue_per_course					int,
	number_of_certified_students_per_course		int
);


-- ETL Process. Fill up the dimensions from the operational database, then fill up the fact table from the dimensions

-- Fill up course dimension
select * from warehouse.dim_course dc;
insert into warehouse.dim_course
select	c.id as courseid, 
		c."name" as coursename, 
		c.points, 
		c.price, 
		cat."name" as categoryname,
		(select count(*) from course_recommendation cr
		where cr.courseid = 1) as numberofrecommendations,
		(select count(*) from course_assignment ca
		where ca.courseid = c.id) as numberofassignments
from course c
join category_course cat_course on c.id = cat_course.courseid
join category cat on cat_course.categoryid = cat.id
group by 
	c.id,
	c."name",
	c.points,
	c.price,
	cat."name";

-- Fill up student dimension
select * from warehouse.dim_student ds;
insert into warehouse.dim_student
select 	s.id as studentid, 
		u.first_name as firstname, 
		u.last_name as lastname, 
		u."age" as "age", 
		u.sex as sex, 
		s.points as points,
		(select count(*) from course_recommendation cr1 where cr1.recommendation_to_student = s.id) as number_of_recommendations_received,
		(select count(*) from course_recommendation cr2 where cr2.recommendation_from_student = s.id) as number_of_recommendations_offered,
		round(avg(case 
				when sr.grade = 'A' then 5
				when sr.grade = 'B' then 4
				when sr.grade = 'C' then 3
				when sr.grade = 'D' then 2
				when sr.grade = 'F' then 1
			end), 2) as averagegrade,
		(select count(*) from certificate c where c.studentid = s.id) as number_of_certificates_received
from student s
join "user" u on s.userid = u.id 
join score_review sr ON sr.studentid = s.id
group by 
	s.id, 
	u.first_name, 
	u.last_name, 
	u."age", 
	u.sex, 
	s.points;

-- Fill up the fact table
select * from warehouse.fact_table ft;
insert into warehouse.fact_table
select 
	dc.courseid,  
	ds.studentid,
	sum(dc.price),
	sum(ds.number_of_certificates_received)
from 
	warehouse.dim_course dc, 
	warehouse.dim_student ds  
group by dc.courseid, ds.studentid;
	
-- ################################### END ######################################
-- ##############################################################################