CREATE DATABASE Fakture

USE  Fakture
GO

CREATE TABLE Document
(
Document_ID bigint identity (1,1) NOT NULL,
DocumentDate date NOT NULL,
DocumentNumber nvarchar(10) NOT NULL,
[Sum] decimal(15,2) NOT NULL
)
GO

CREATE TABLE Document_Details
(
DocumentDetails_ID bigint identity (1,1) NOT NULL,
Document_ID bigint NOT NULL,
[Name] nvarchar (255) NOT NULL,
Quantity decimal(15,3) NOT NULL,
Price decimal(15,2) NOT NULL,
[Sum] decimal(15,2) NOT NULL,
OrdinalNumber int
)
GO

ALTER TABLE Document
ADD CONSTRAINT PK_Document PRIMARY  KEY (Document_ID);
GO

ALTER TABLE Document_Details
ADD CONSTRAINT PK_Document_Details PRIMARY  KEY (DocumentDetails_ID);
GO

ALTER TABLE Document_Details
ADD CONSTRAINT FK_Document_Document_Details FOREIGN KEY (Document_ID) REFERENCES Document (Document_ID) ON DELETE CASCADE;
GO

CREATE TYPE [dbo].[document_details_list] AS TABLE (
[DocumentDetails_ID] [bigint] NULL,
[Document_ID] [bigint] NULL,
[Name] [nvarchar](255) NULL,
[Quantity] [decimal](15, 3) NULL,
[Price] [decimal](15, 2) NULL,
[Sum] [decimal](15, 2) NULL,
[OrdinalNumber] [int] NULL
)
GO

CREATE PROCEDURE [dbo].[Document_Save]
	@Document_ID bigint,
	@DocumentDate datetime,
	@DocumentNumber nvarchar(10),
	@Sum decimal(15,2),
	@Document_Details document_details_list readonly

AS
BEGIN
	IF @Document_ID = 0
	BEGIN	
		INSERT INTO Document(DocumentDate, DocumentNumber, [Sum])
		VALUES (@DocumentDate, @DocumentNumber, @Sum)
				SET @Document_ID = SCOPE_IDENTITY()
	END

	ELSE
	BEGIN
		UPDATE Document SET DocumentDate = @DocumentDate, DocumentNumber = @DocumentNumber, [Sum] = @Sum	
		WHERE Document_ID = @Document_ID

	END

----------STAVKE DOKUMENTA------------

	--DELETE STAVKI KOJE NISU U LISTI
	DELETE DD FROM Document_Details DD
	WHERE DD.DocumentDetails_ID NOT IN (SELECT DocumentDetails_ID FROM @Document_Details)
	AND DD.Document_ID = @Document_ID

	UPDATE Document_Details SET [Name] = DD.[Name], Quantity = DD.Quantity, Price = DD.Price, [Sum] = DD.[Sum], OrdinalNumber = DD.OrdinalNumber
	FROM @Document_Details DD
	WHERE Document_Details.DocumentDetails_ID = DD.DocumentDetails_ID

    --INSTERT NOVIH STAVKI
    INSERT INTO Document_Details (Document_ID, [Name], Quantity, Price, [Sum], OrdinalNumber)
	SELECT @Document_ID, DD.[Name], DD.Quantity, DD.Price, DD.[Sum], DD.OrdinalNumber
	FROM @Document_Details DD
	WHERE DD.DocumentDetails_ID NOT IN (SELECT DocumentDetails_ID FROM Document_Details WHERE Document_ID = @Document_ID)
END


CREATE PROCEDURE [dbo].[Document_Delete]
@Document_ID bigint 
AS
BEGIN	
	DELETE FROM Document WHERE Document_ID = @Document_ID
END
GO


CREATE PROCEDURE [dbo].[Document_FindById]
@Document_ID bigint
AS
BEGIN

IF @Document_ID > 0

		IF NOT EXISTS(SELECT TOP 1 1 FROM Document WHERE Document_ID = @Document_ID)
		BEGIN
			RAISERROR('document_not_found', 11, 1)
			RETURN
		END

	SELECT * FROM Document D
	WHERE Document_ID = @Document_ID
	SELECT * FROM Document_Details DD
	WHERE Document_ID = @Document_ID
END 
GO


CREATE PROCEDURE [dbo].[Document_SelectAll]
AS
BEGIN

SELECT * FROM Document D
SELECT * FROM Document_Details
END

