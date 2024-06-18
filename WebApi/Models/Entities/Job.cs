using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Entities
{
    public class Job
    {
        public Guid Id { get; set; }
        public string JobTitle { get; set; }
    }
}