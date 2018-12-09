using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CCFLoggingConfig.Models.Sysssislog
{
    public class SysssislogViewModel
    {
        public int id { get; set; }
        public string @event { get; set; }
        public string computer { get; set; }
        public string @operator { get; set; }
        public string source { get; set; }
        public System.Guid sourceid { get; set; }
        public System.Guid executionid { get; set; }
        public string starttime { get; set; }
        public string endtime { get; set; }
        public int datacode { get; set; }
        public byte[] databytes { get; set; }
        public string message { get; set; }
    }
}