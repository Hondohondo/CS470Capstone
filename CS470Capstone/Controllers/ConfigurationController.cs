using System;
using System.Collections.Generic;
using System.Linq.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using CCFLoggingConfig.Models;

namespace CCFLoggingConfig.Controllers
{
    public class ConfigurationController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetConfigurationsForDataTable(string application, string searchTerm)

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
                    IQueryable<Configuration> query = db.Configurations;

                    //Sorting    
                    if (sortDirection.ToLowerInvariant() == "asc")
                    {
                        query = query.OrderBy(sortColumn);
                    }
                    else
                    {
                        query = query.OrderBy(sortColumn + " " + sortDirection);
                    }

                    //filtering
                    if (!String.IsNullOrWhiteSpace(application))
                    {
                        query = query.Where(l => l.Application == application.Trim());
                    }

                    if (!String.IsNullOrWhiteSpace(searchTerm))
                    {
                        query = query.Where(l => l.Key.Contains(searchTerm) ||
                            l.Application.Contains(searchTerm) ||
                            l.Key.Contains(searchTerm));
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


        [HttpPost]
        public JsonResult GetConfiguration(String application, String key)
        {
            try
            {
                using (var db = new logconfigEntities())
                {
                    var config = db.Configurations.Find(application, key);
                    return Json(config);
                }
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }

        }


        [HttpPost]
        public JsonResult SetConfiguration(String application, String key, String value)
        {
            try
            {
                using (var db = new logconfigEntities())
                {
                    var config = db.Configurations.Find(application, key);
                    config.Value = value;
                    db.SaveChanges();
                    return Json("successfully changed to" + value);
                }
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }

        }
        [HttpPost]
        public JsonResult GetApplications()
        {
            try
            {
                using (var db = new logconfigEntities())
                {
                    var applications = db.Configurations.Select(l => l.Application).Distinct().ToList();

                    return Json(applications);
                }
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }
    }

}