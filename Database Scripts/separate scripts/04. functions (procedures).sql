--#######################################################--
--###################### FUNCTIONS ######################--

-- Insert a new instructor user
create or replace procedure insertinstructor(
	in first_name character varying, 
	in last_name character varying, 
	in email character varying, 
	in password character varying, 
	in sex character, 
	in age numeric, 
	in created_by_admin bigint, 
	in salary numeric, 
	in title character, 
	in description character varying)
 language plpgsql
as $procedure$
declare 
	newUserId bigint;
begin
	insert into "user"(first_name, last_name, email, "password", sex, "age")
	values(first_name, last_name, email, "password", sex, "age") 
	returning id 
	into newUserId;

	commit;
	
	insert into instructor(userid, created_by_admin, salary, title, description)
	values(newUserId, created_by_admin, salary, title, description);
	
	commit;
end;
$procedure$;

--#######################################################--
-- Update an existing instructor user
create or replace procedure updateinstructor(
	in instructoridinput bigint, 
	in useridinput bigint, 
	in first_nameinput character varying, 
	in last_nameinput character varying, 
	in emailinput character varying, 
	in passwordinput character varying, 
	in sexinput character, 
	in ageinput numeric, 
	in salaryinput numeric, 
	in titleinput character, 
	in descriptioninput character varying)
 language plpgsql
as $procedure$
begin
	update "user"
	set 
		first_name = first_nameInput, 
		last_name = last_nameInput, 
		email = emailInput, 
		"password" = passwordInput, 
		sex = sexInput, 
		"age" = ageInput
	where id = userIdInput;
	commit;

	update instructor
	set
		salary = salaryInput, 
		title = titleInput, 
		description = descriptionInput
	where id = instructorIdInput;
	commit;

end;
$procedure$;

--#######################################################--
-- Insert a new student user
create or replace procedure insertstudent(
	in first_name character varying, 
	in last_name character varying,
	in email character varying, 
	in password character varying,
	in sex character, 
	in age numeric, 
	in points numeric)
 language plpgsql
as $procedure$
declare 
	newUserId bigint;
begin
	insert into "user"(first_name, last_name, email, "password", sex, "age")
	values(first_name, last_name, email, "password", sex, "age") 
	returning id 
	into newUserId;

	commit;
	
	insert into student(userid, points)
	values(newUserId, points);
	
	commit;
end;
$procedure$;

--#######################################################--
-- Update an existing student user
create or replace procedure updatestudent(
	in studentidinput bigint, 
	in useridinput bigint, 
	in first_nameinput character varying, 
	in last_nameinput character varying,
	in emailinput character varying,
	in passwordinput character varying, 
	in sexinput character, 
	in ageinput numeric, 
	in pointsinput numeric)
 language plpgsql
as $procedure$
begin
	update "user"
	set 
		first_name = first_nameInput, 
		last_name = last_nameInput, 
		email = emailInput, 
		"password" = passwordInput, 
		sex = sexInput, 
		"age" = ageInput
	where id = userIdInput;
	commit;

	update student
	set
		points = pointsInput
	where id = studentIdInput;
	commit;
end;
$procedure$;

--#######################################################--
-- A given student is enrolling a given course
create or replace procedure enrollstudentincourse(
	in studentidinput bigint,
	in courseidinput bigint)
 language plpgsql
 as $procedure$
 begin 
 	insert into takes_course(studentid, courseid, date_bought, date_completed)
 	values(studentidinput, courseidinput, now(), null);
 	
 	commit;
 end;
$procedure$;

--#######################################################--TESTING--#######################################################--
call enrollstudentincourse(598, 500);

select * 
from course c
join takes_course tc on c.id = tc.courseid
join student s on s.id = tc.studentid 
where tc.studentid = 598 and c.id = 500;

select * from course c
where c.id = 500;
--#######################################################--TESTING--#######################################################--
 

--#######################################################--
-- A given student finishing a given course
create or replace procedure studentfinishcourse(
	in studentidinput bigint,
	in courseidinput bigint)
 language plpgsql
 as $procedure$
 declare 
 	coursepoints bigint;
 begin 
	-- set the status of the course to completed
 	update takes_course
 	set date_completed = now()
 	where studentid = studentidinput
 	and	courseid = courseidinput;

 	commit;
 
 	insert into certificate(studentid, courseid, date_issued)
 	values(studentidinput, courseidinput, now());
 	
 	if(	(select count(*) from course_assignment ca 
		join course c on ca.courseid = c.id
		where c.id = courseidinput) = 
		
	-- check if the number of possible assignments (up) for that course
	-- is the same number of submitted assignments for that course by that
	-- particular student (down) 
		
		(select count(*) from submitted_assignment sa
		join course_assignment ca on sa.course_assignmentid = ca.id
		join course c on ca.courseid = c.id
		where c.id = courseidinput and sa.studentid = studentidinput)
	) then
	-- then commit the certificate insertion
 		commit;
 		
 	-- grab the points for this course and add it to the student's profile
 		select c.points from course c
 		where c.id = courseidinput
 		into coursepoints;
 	
 		update student s 
 			set points = s.points + coursepoints
 		where s.id = studentidinput;
 		commit;
 	else
 		rollback;
 	end if;
 end;
$procedure$;