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


-- Update an existing student user
create or replace procedure public.updatestudent(
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

-- A given student is enrolling a given course

-- Creating an assignment for a given course

-- A given student finishing a given course

-- Adding a given course into a given category