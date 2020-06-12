DROP TABLE IF EXISTS accounts; 

CREATE TABLE [dbo].[accounts](
    [id] int IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL
  , [username] [varchar](50) NOT NULL
  , [password] [varchar](255) NOT NULL
  , [email] [varchar](100) NOT NULL
  , INDEX idx_accounts_username ( username ) 
)

INSERT INTO accounts ([username], [password] , [email]) 
VALUES ('test', 'test', 'test@test.com');
