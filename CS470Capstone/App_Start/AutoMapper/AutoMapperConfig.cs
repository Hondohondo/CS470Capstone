using AutoMapper;
using CCFLoggingConfig.Models;
using System;
using System.Web;
using System.Web.Optimization;

namespace CCFLoggingConfig
{
    public class AutoMapperConfig
    {
        public AutoMapperConfig()
        {
            Mapper.Initialize(cfg => 
            
                cfg.CreateMap<Log,LogViewModel>()
                    .AfterMap((src, dest) => dest.Timestamp = Convert.ToDateTime(src.Timestamp).ToString("yyyy-mm-dd")));
        }
    }

}