using System;
using System.Collections.Generic;
using FAKTURA.Repository.Implementation;
using FAKTURA.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace FAKTURA.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class ValuesController : Controller
    {         
        private DocumentRepository _repository = new DocumentRepository();
        [HttpGet]
        public List<Document> GetAllDocuments()
        {
            return _repository.GetAllDocuments();
        }

        [HttpGet("{id}")]
        public ActionResult<Document> Get(long id)
        {
            return _repository.FindByID(id);
        }

        [HttpPost]
        public void InsertDocument([FromBody] Document document)
        {
            _repository.SaveDocument(document);
        }

        [HttpPut("{id}")]
        public void UpdateDocument([FromBody] Document document)
        {
            _repository.SaveDocument(document);
        }

        [HttpDelete("{id}")]
        public void Delete(long id)
        {
          _repository.DeleteDocument(id);
        }
    }
}
