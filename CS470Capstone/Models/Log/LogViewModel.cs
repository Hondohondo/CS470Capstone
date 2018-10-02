using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CCFLoggingConfig.Models
{
    public class LogViewModel
    {
        public int LogID { get; set; }
        public Nullable<int> EventID { get; set; }
        public int Priority { get; set; }
        public string Severity { get; set; }
        public string Title { get; set; }
        public string Timestamp { get; set; }
        public string MachineName { get; set; }
        public string AppDomainName { get; set; }
        public string ProcessID { get; set; }
        public string ProcessName { get; set; }
        public string ThreadName { get; set; }
        public string Win32ThreadId { get; set; }
        public Nullable<int> DoctorKey { get; set; }
        public string AuthenticatedUser { get; set; }
        public string Message { get; set; }
        public string FormattedMessage { get; set; }
        public string EntityKey { get; set; }
    }
}