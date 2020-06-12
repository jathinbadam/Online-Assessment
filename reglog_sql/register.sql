USE [calender]
GO

/****** Object:  StoredProcedure [dbo].[User_Add]    Script Date: 6/6/2020 5:54:12 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[register]
@Name varchar(50),
@Company varchar(50),
@Email varchar(50),
@Password varchar(50)

As
Begin
IF EXISTS(SELECT [Email] FROM dbo.tbl_newUser WHERE [Email] = @Email)
Begin
Return 0;
End
Else
Begin
INSERT INTO calender.dbo.tbl_newUser ([Name],[Company],[Email],[Password])
VALUES (@Name,@Company,@Email,@Password)

INSERT INTO calender.dbo.accounts ( [username] ,[password],[email])
VALUES (@Name,@Password, @Email)

RETURN 1;
End
End
GO