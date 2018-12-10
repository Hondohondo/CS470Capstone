using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Linq.Dynamic;
using AutoMapper;

namespace CCFLoggingConfig.Controllers
{
    public class SSIS_ConfigurationController : Controller
    {
        // GET: SSIS_Configuration
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetSSIS_ConfigurationForDataTable()
        {
            try
            {
                var draw = Request.Form.GetValues("draw").FirstOrDefault();
                var start = Request.Form.GetValues("start").FirstOrDefault();
                var length = Request.Form.GetValues("length").FirstOrDefault();

                var sortDirection = Request.Form.GetValues("order[0][dir]").FirstOrDefault();
                var sortColumnIndex = Request.Form.GetValues("order[0][column]").FirstOrDefault();
                var sortColumn = Request.Form.GetValues(String.Format("columns[{0}][name]", sortColumnIndex)).FirstOrDefault();


                //Paging Size (10,20,50,100)    
                int pageSize = length != null ? Convert.ToInt32(length) : 0;
                int skip = start != null ? Convert.ToInt32(start) : 0;
                int recordsTotal = 0;

                using (var db = new logconfigEntities())
                {
                    IQueryable<SSIS_Configurations> query = db.SSIS_Configurations;

                    //Sorting    
                    if (sortDirection.ToLowerInvariant() == "asc")
                    {
                        query = query.OrderBy(sortColumn);
                    }
                    else
                    {
                        query = query.OrderBy(sortColumn + " " + sortDirection);
                    }

                    //total number of rows count     
                    recordsTotal = query.Count();
                    //Paging     
                    var data = query
                        .Skip(skip)
                        .Take(pageSize)
                        .ToList();

                    //Returning Json Data    
                    return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = data });
                }
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }
    }
}