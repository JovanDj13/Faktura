using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FAKTURA.Models
{
    public class Document
    {
        public long Document_ID { get; set; }

        [Required(ErrorMessage = "document_required")]
        public DateTime DocumentDate { get; set; }

        [Required(ErrorMessage = "documentnumber_required")]
        public string DocumentNumber { get; set; }

        [Required(ErrorMessage = "quantity_required")]
        public decimal Sum { get; set; }

        public List<DocumentDetails> Document_Details { get; set; } = new List<DocumentDetails>();

    }

    public class DocumentDetails
    {
        public long Document_Details_ID { get; set; }

        [Required(ErrorMessage = "document_id_required")]
        public long Document_ID { get; set; }

        [Required(ErrorMessage = "name_required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "quantity_required")]
        public decimal Quantity { get; set; }

        [Required(ErrorMessage = "price_required")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "sum_required")]
        public decimal Sum { get; set; }

        [Required(ErrorMessage = "ordinalnumeber_required")]
        public int OrdinalNumber { get; set; }
    }
}
