using FAKTURA.Models;
using FAKTURA.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using static System.Data.CommandType;

namespace FAKTURA.Repository.Implementation
{
    public class DocumentRepository : IDocumentRepository
    {
        IDbConnection CreateConnection() => new SqlConnection("Data Source =.;Initial Catalog =Fakture;Integrated Security =true;");

        public List<Document> GetAllDocuments()
        {        
            using (var connection = CreateConnection())
            {
                connection.Open();
                var multi = connection.QueryMultiple("[dbo].[Document_SelectAll]", null, null, null, StoredProcedure);
                var document = multi.Read<Document>().ToList();
                var details = multi.Read<DocumentDetails>().ToList();
                document.ForEach(x => x.Document_Details = details.Where(y => x.Document_ID == y.Document_ID).ToList());
                return document;
            }
        }

        public void SaveDocument(Document item)
        {
            using (var connection = CreateConnection())
            {
                connection.Open();
                var param = new DynamicParameters(new
                {
                    item.Document_ID,
                    item.DocumentDate,
                    item.DocumentNumber,
                    item.Sum,
                });
                param.AddTable("Document_Details", "document_details_list", item.Document_Details);       
                connection.ExecuteReader("[dbo].[Document_Save]", param, null, null, StoredProcedure);
            }
        }
  
        public Models.Document FindByID(long Document_ID)
        {
            using (var connection = CreateConnection())
            {
                connection.Open();

                var param = new DynamicParameters(new
                {
                    Document_ID
                });

                var multi = connection.QueryMultiple("[dbo].[Document_FindById]", param, null, null, StoredProcedure);
                Models.Document document = multi.Read<Document>().Single();
                document.Document_Details = multi.Read<DocumentDetails>().ToList();
                return document;
            }          
        }

        public void DeleteDocument(long Document_ID)
        {
            using (var connection = CreateConnection())
            {
                connection.Open();

                var param = new DynamicParameters(new
                {
                    Document_ID
                });

             connection.QueryMultiple("[dbo].[Document_Delete]", param, null, null, StoredProcedure);
            }
        }
    }

}

