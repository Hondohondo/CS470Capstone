using AutoMapper;
using CCFLoggingConfig.Models;
using CCFLoggingConfig.Models.Sysssislog;
using System;
using System.Web;
using System.Web.Optimization;

namespace CCFLoggingConfig
{
    public class AutoMapperConfig
    {
        public AutoMapperConfig()
        {
            AutoMapper.Mapper.Initialize(cfg =>
            {

                cfg.CreateMap<Log, LogViewModel>()
                    .AfterMap((src, dest) => dest.Timestamp = Convert.ToDateTime(src.Timestamp).ToString("yyyy-mm-dd"));
                cfg.CreateMap<sysssislog, SysssislogViewModel>()
                    .AfterMap((src, dest) => dest.starttime = Convert.ToDateTime(src.starttime).ToString("yyyy-mm-dd"))
                    .AfterMap((src, dest) => dest.endtime = Convert.ToDateTime(src.endtime).ToString("yyyy-mm-dd")); 
            });
        }
    }

}