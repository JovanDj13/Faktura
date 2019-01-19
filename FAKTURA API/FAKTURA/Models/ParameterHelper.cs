using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace FAKTURA.Models
{
    public static  class ParameterHelper
    {
        public static void AddTable<T>(this DynamicParameters source, string parameterName, string dataTableType, ICollection<T> values)
        {
            var table = new DataTable();
            var properties = typeof(T).GetRuntimeProperties().ToArray();
            foreach (var prop in properties)
            {
                table.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
            }
            foreach (var value in values)
            {
                var parameters = new List<object>();
                var valueProperties = value.GetType().GetRuntimeProperties().ToArray();
                foreach (var prop in valueProperties)
                {
                    var p = prop.GetValue(value);
                    parameters.Add(p);
                }
                table.Rows.Add(parameters.ToArray());
            }
            source.Add(parameterName, table.AsTableValuedParameter(dataTableType));
        }
    }
}
