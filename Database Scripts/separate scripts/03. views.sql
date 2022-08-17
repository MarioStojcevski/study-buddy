--###################################################--
--###################### VIEWS ######################--

create or replace view view_courses_by_category as
select 	cat.id as catid, 
		cat.parent_category_id as parentid,
		cat."name" as cat_name,
		c.id,
		c."name",
		c.description,
		c.points,
		c.price 
from category cat
join category_course cc on cat.id = cc.categoryid 
join course c on c.id = cc.courseid;

select * from view_courses_by_category;

--###################################################--

create or replace view view_courses_by_instructor as
select 	c.id as courseid,
		c."name" as course,
		c.description,
		c.points,
		c.price,
		ins.id as instructorid,
		ins.title,
		u.first_name,
		u.last_name, 
		u.email
from instructor ins
join "user" u on ins.userid = u.id 
join teaches_course tc on ins.id = tc.instructorid 
join course c on c.id = tc.courseid;

select * from view_courses_by_instructor;

--###################################################--

create or replace view view_student_total_points as
select 	s.id,
		u.first_name,
		u.last_name,
		u.email,
		sum(s.points) 
from student s
join "user" u on u.id = s.userid 
right join takes_course tc on tc.studentid = s.id
group by s.id, u.first_name, u.last_name, u.email 
order by points asc;

select * from view_student_total_points;

--###################################################--

create or replace view view_enrolled_students
as select distinct	c.id,
		c."name" as course,
		u.first_name,
		u.last_name,
		u.email
from course c 
join takes_course tc on tc.courseid  = c.id 
join student s on s.id = tc.courseid
join "user" u on u.id = s.userid;

select * from view_enrolled_students;

--###################################################--

create or replace view view_list_all_users
as select u.id,
    u.first_name,
    u.last_name,
    u.email
from "user" u;

select * from view_list_all_users vlau;

--###################################################--





