-- ############################# ANALYTICAL QUERIES #############################
-- ##############################################################################

-- Average pay for instructors
drop view if exists view_average_instructor_salary;
create view view_average_instructor_salary as
select round(avg(salary), 2) as average_salary, count(*) as no_instructors
from instructor i;
select * from view_average_instructor_salary;

-- View the number of course assignments created per each instructor
drop view if exists view_no_course_assignments_created_per_instructor;
create view view_no_course_assignments_created_per_instructor as
select 
	i.id as instructorid,
	(i.title || ' ' || u.first_name || ' ' || u.last_name) as instructor,
	count(*)
from course_assignment ca
join instructor i on ca.instructorid = i.id
join "user" u on i.userid = u.id
group by i.id, u.first_name, u.last_name;
select * from view_no_course_assignments_created_per_instructor;

-- The average price for a course on StudyBuddy
drop view if exists view_average_course_price;
create view view_average_course_price as
select 
	round(avg(c.price), 2) as average_course_price,
	count(*) as no_courses
from course c;
select * from view_average_course_price;

-- The percentage of gender population among each course
drop view if exists view_gender_statistics_per_course;
create view view_gender_statistics_per_course as
select 
	c."name" as course,
	count(*) as total_students,
	sum(case when u.sex = 'M' then 1 else 0 end) as male_students,
	cast(sum(case when u.sex = 'M' then 1 else 0 end)::float/count(*)::float*100 as int) || '%'
		as male_students_percentage,
	sum(case when u.sex = 'F' then 1 else 0 end) as female_students,
	cast(sum(case when u.sex = 'F' then 1 else 0 end)::float/count(*)::float*100 as int) || '%'
		as female_students_percentage,
	sum(case when u.sex is null then 1 else 0 end) as non_binary,
	cast(sum(case when u.sex is null then 1 else 0 end)::float/count(*)::float*100 as int)  || '%'
		as non_binary_percentage
from course c
join takes_course tc on tc.courseid = c.id
join student s on tc.studentid = s.id 
join "user" u on s.userid = u.id
group by c.id;
select * from view_gender_statistics_per_course;

-- ################################### END ######################################
-- ##############################################################################