using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FAKTURA.Models;

namespace FAKTURA.Repository.Interfaces
{
    public interface IDocumentRepository 
    {
        List<Document> GetAllDocuments();
        void SaveDocument(Document document);

        Document FindByID(long Document_ID);

        void DeleteDocument(long Document_ID);
    }
}
