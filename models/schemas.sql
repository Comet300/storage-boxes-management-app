create table file_types
(
    Id   int auto_increment
        primary key,
    Type varchar(255) not null
);

create table locations
(
    Id   int unsigned auto_increment
        primary key,
    Name varchar(255) null,
    constraint Name_UNIQUE
        unique (Name),
    constraint id_UNIQUE
        unique (Id)
);

create table personal_data_types
(
    Id   int auto_increment
        primary key,
    Type varchar(100) not null
);

create table clients
(
    Id               int auto_increment
        primary key,
    PersonalData     varchar(255) not null,
    PersonalDataType int          null,
    constraint clients_personal_data_type_fk
        foreign key (PersonalDataType) references personal_data_types (Id)
);

create table boxes
(
    Id         int auto_increment
        primary key,
    Price      smallint unsigned default '1000' not null,
    Location   int unsigned      default '10'   not null,
    Client     int                              null,
    Identifier varchar(255)                     not null,
    Size       varchar(25)                      not null,
    constraint boxes_client_fk
        foreign key (Client) references clients (Id),
    constraint boxes_location_fk
        foreign key (Location) references locations (Id)
);

create table client_files
(
    Id       int auto_increment
        primary key,
    ClientId int           null,
    FileType int           not null,
    FileId   varchar(255)  not null,
    FileUrl  varchar(2048) null,
    constraint client_files_client_fk
        foreign key (ClientId) references clients (Id),
    constraint client_files_file_type_fk
        foreign key (FileType) references file_types (Id)
);

create table payments_old
(
    StartDate varchar(20)                        not null,
    EndDate   varchar(20)                        not null,
    Id        int auto_increment
        primary key,
    Amount    mediumint                          not null,
    Created   datetime default CURRENT_TIMESTAMP not null,
    Box       int                                not null,
    constraint payments_old_box_fk
        foreign key (Box) references boxes (Id)
);

create table users
(
    Id       varchar(36)   not null
        primary key,
    Username varchar(255)  not null,
    Email    varchar(255)  not null,
    salt     varchar(255)  not null,
    hash     varchar(2048) null
);

create table tokens
(
    Id        varchar(36)                        not null
        primary key,
    UserId    varchar(36)                        null,
    CreatedAt datetime default CURRENT_TIMESTAMP not null,
    UpdatedAt datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    Token     varchar(255)                       not null,
    constraint tokens_users_Id_fk
        foreign key (UserId) references users (Id)
);

