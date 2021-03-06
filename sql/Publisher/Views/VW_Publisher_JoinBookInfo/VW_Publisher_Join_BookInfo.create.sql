-- Create a new view called 'VW_Publisher_Join_BookInfo' in schema 'dbo'
-- Drop the view if it already exists
IF EXISTS (
SELECT *
FROM sys.views
    JOIN sys.schemas
    ON sys.views.schema_id = sys.schemas.schema_id
WHERE sys.schemas.name = N'dbo'
    AND sys.views.name = N'VW_Publisher_Join_BookInfo'
)
DROP VIEW dbo.VW_Publisher_Join_BookInfo
GO
-- Create the view in the specified schema
CREATE VIEW dbo.VW_Publisher_Join_BookInfo
AS
    -- body of the view
    SELECT P.[publisherId], COUNT(BI.[bookInfoId]) AS [bookCount]
    FROM dbo.[Publisher] AS P
        LEFT JOIN dbo.[BookInfo] AS BI
        ON P.[publisherId] = BI.[publisherId]
    GROUP BY P.[publisherId]
GO

SELECT *
FROM dbo.[VW_Publisher_Join_BookInfo]