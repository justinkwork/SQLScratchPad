USE [ServiceManagement]
GO
INSERT INTO [dbo].[DataSource]
           ([Id]
           ,[Title]
           ,[ConnectionString]
           ,[Query]
           ,[DataSourceId])
     VALUES
           (
  'bade578e-6140-4cc1-a660-2f4388683423', 'SQL ScratchPad - ServiceManager', null, 'SELECT {{qFields}}
FROM {{tableName}}
{{whereClause}}', '2'
  )
GO
INSERT INTO [dbo].[DataSource]
           ([Id]
           ,[Title]
           ,[ConnectionString]
           ,[Query]
           ,[DataSourceId])
     VALUES
           (
  'f131f8cb-2a35-fdfa-401d-46910ac2e6e1', 'SQL ScratchPad - ServiceManagement', null, 'SELECT {{qFields}}
FROM {{tableName}}
{{whereClause}}', '1'
  )
GO