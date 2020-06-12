DROP TABLE IF EXISTS events;

CREATE TABLE events(
        id int IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL
        , userID nvarchar(50) NOT NULL
        , title nvarchar(200) NOT NULL
        , [description] nvarchar(1000) NULL
        , startDate date NOT NULL
        , startTime time(0) NULL
        , endDate date NULL
        , endTime time(0) NULL
        , INDEX idx_events_userId ( userID ) 
 )


 INSERT INTO events ( userID, title, [description], startDate , startTime , endDate, endTime)
 VALUES ('USER1234', N'APPOINTMENT', N'DESCRIPTION STUFF', '2020-03-31', '14:30', NULL, NULL)
 , ('USER1234', N'ONLINE CONDFERENCE', N'nhnmhjm', '2020-04-01', NULL, '2020-04-02', NULL)
