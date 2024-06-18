using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Protocol;

namespace WebApi.Models.DTOs
{
    public class JobCreateDTO
    {
        public string JobTitle { get; set; }
        public string StageName { get; set; }
    }
}