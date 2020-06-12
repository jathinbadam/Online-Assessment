
DROP TABLE IF EXISTS  tbl_newUser
CREATE TABLE tbl_newUser
(

      id int IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL
    , [Name] nvarchar(50) NOT NULL
    , [Company] NVARCHAR(50) NOT NULL
    , [Email] NVARCHAR(50) NOT NULL
    , [Password] NVARCHAR(50) NOT NULL
    , [Result] varchar(50) NOT NULL
);
GO