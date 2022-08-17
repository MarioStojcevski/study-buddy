drop table if exists "user";
create table "user" (
  	id 			serial 			primary key,
  	first_name 	varchar(255) 	not null,
  	last_name 	varchar(255) 	not null,
  	email 		varchar(255) 	not null,
  	password 	varchar(255) 	not null,
  	sex 		char(1),
  	age 		numeric(3,0)
);

drop table if exists "admin";
create table "admin" (
  	id 			serial 	primary key,
  	userid 		bigint 	not null,
  	constraint FK_user_id foreign key (userid)
  		references "user" (id) on delete cascade
);

drop table if exists instructor;
create table instructor (
  	id 					serial 			primary key,
  	userid 				bigint 			not null unique,
  	created_by_admin 	bigint 			not null,
  	salary 				numeric(7,2) 	not null,
  	title 				char(2),
  	description 		varchar(255),
 	constraint FK_created_by foreign key (created_by_admin)
 		references "admin" (id),
 	constraint FK_user_id foreign key (userid)
 		references "user" (id) on delete cascade
);

drop table if exists student;
create table student (
  	id 			serial 		primary key,
  	userid 		bigint 		not null unique,
  	points 		numeric(7,2),
  	constraint FK_user_id foreign key (userid)
  		references "user" (id) on delete cascade
);

drop table if exists course;
create table course (
  	id 				serial 			primary key,
  	name 			varchar(255) 	not null,
  	points 			numeric(5,2) 	not null,
  	description 	varchar,
  	price 			numeric(5,2) 	not null
);

drop table if exists category;
create table category (
  	id 					serial 			primary key,
  	parent_category_id 	bigint,
  	name 				varchar(255) 	not null,
  	description 		varchar(255),
  	constraint FK_parentcategory foreign key (parent_category_id)
  		references category (id) on delete set null
);

drop table if exists category_course;
create table category_course (
	id					serial 	primary key,
  	categoryid 			bigint 	not null,
  	courseid 			bigint 	not null,
	constraint FK_course foreign key (courseid)
		references course (id) on delete set null,
	constraint FK_category foreign key (categoryid)
		references category (id)
);



drop table if exists course_assignment;
create table course_assignment (
  	id 				serial 			primary key,
  	courseid 		bigint 			not null,
  	instructorid 	bigint 			not null,
  	start_date 		date 			not null,
  	due_date 		date,
	fileURL 		varchar(255),
	course_points 	numeric(5,2) 	not null,
	constraint FK_created_by_instructor foreign key (instructorid)
		references instructor (id) on delete set null,
	constraint FK_for_course foreign key (courseid)
		references course (id) on delete cascade
);

drop table if exists material_type;
create table material_type (
  	id 			serial 			primary key,
  	type_name 	varchar(255) 	not null
);

drop table if exists course_document_material;
create table course_document_material (
  	id 					serial 			primary key,
  	courseid 			bigint 			not null,
  	title 				varchar(255),
  	materialURL 		varchar(255) 	not null,
  	material_typeid 	bigint 			not null,
  	constraint FK_course foreign key (courseid)
  		references course (id) on delete cascade,
  	constraint FK_material_type foreign key (material_typeid)
  		references material_type (id) on delete set null
);

drop table if exists teaches_course;
create table teaches_course (
  	id 				serial 		primary key,
  	instructorid 	bigint 		not null,
  	courseid 		bigint 		not null,
  	constraint FK_taught_course foreign key (courseid)
  		references course (id) on delete cascade,
  	constraint FK_teaching_instructor foreign key (instructorid)
  		references instructor (id) on delete set null
);

drop table if exists takes_course;
create table takes_course (
  	id 					serial 	primary key,
  	studentid 			bigint 	not null,
  	courseid 			bigint 	not null,
  	date_bought 		date 	not null,
  	date_completed 		date,
  	constraint FK_taken_course foreign key (courseid)
  		references course (id) on delete cascade,
  	constraint FK_taken_by_student foreign key (studentid)
  		references student (id) on delete cascade
);

drop table if exists course_recommendation;
create table course_recommendation (
  	id								serial 	primary key,
  	courseid 						bigint 	not null,
  	recommendation_from_student 	bigint 	not null,
  	recommendation_to_student 		bigint 	not null,
  	constraint FK_recommendation_to_student foreign key (recommendation_to_student)
  		references student (id) on delete cascade,
  	constraint FK_recommendation_from_student foreign key (recommendation_from_student)
  		references student (id) on delete cascade,
  	constraint FK_recommeneded_course foreign key (courseid)
  		references course (id)
);

drop table if exists score_review;
create table score_review (
  	id 				serial 	primary key,
  	studentid 		bigint 	not null,
  	courseid 		bigint 	not null,
  	date_review 	date 	not null,
  	grade 			char(1) not null,
  	constraint FK_score_for_course foreign key (courseid)
  		references course (id),
  	constraint FK_score_for_student foreign key (studentid)
  		references student (id)
);

drop table if exists certificate;
create table certificate (
  	id 				serial 	primary key,
  	studentid 		bigint 	not null,
  	courseid 		bigint 	not null,
  	date_issued 	date 	not null,
  	constraint FK_certificate_for_course foreign key (courseid)
  		references course (id),
  	constraint FK_certificate_for_student foreign key (studentid)
  		references student (id)
);

drop table if exists submitted_assignment;
create table submitted_assignment (
  	id 						serial 	primary key,
  	studentid 				bigint 	not null,
  	course_assignmentid 	bigint 	not null,
  	date_completed 			date,
  	fileURL 				varchar not null,
  	constraint FK_submittion_from_student foreign key (studentid)
  		references student (id),
  	constraint FK_submittion_for_course foreign key (course_assignmentid)
  		references course_assignment (id)
);