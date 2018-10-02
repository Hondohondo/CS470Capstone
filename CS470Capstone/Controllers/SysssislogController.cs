using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;
using System.Web;
using System.Web.Mvc;

namespace CCFLoggingConfig.Controllers
{
    public class SysssislogController : Controller
    {
        // GET: Sysssislog
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetSysssislog(int ID)
        {
            try
            {
               
                using (var db = new logconfigEntities())
                {
                    
                    var sysssislog = db.sysssislogs.Find(ID);
                    return Json(sysssislog);
                }
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }

        }

        [HttpPost]
        public JsonResult GetSysssislogForDataTable()
        {
            try
            {
                var draw = Request.Form.GetValues("draw").FirstOrDefault();
                var start = Request.Form.GetValues("start").FirstOrDefault();
                var length = Request.Form.GetValues("length").FirstOrDefault();

                var searchValue = Request.Form["search[value]"].FirstOrDefault().ToString();

                var sortDirection = Request.Form.GetValues("order[0][dir]").FirstOrDefault();
                var sortColumnIndex = Request.Form.GetValues("order[0][column]").FirstOrDefault();
                var sortColumn = Request.Form.GetValues(String.Format("columns[{0}][name]", sortColumnIndex)).FirstOrDefault();


                //Paging Size (10,20,50,100)    
                int pageSize = length != null ? Convert.ToInt32(length) : 0;
                int skip = start != null ? Convert.ToInt32(start) : 0;
                int recordsTotal = 0;

                using (var db = new logconfigEntities())
                {
                    IQueryable<sysssislog> query = db.sysssislogs;

                    //Sorting    
                    if (sortDirection.ToLowerInvariant() == "asc")
                    {
                        query = query.OrderBy(sortColumn);
                    }
                    else
                    {
                        query = query.OrderBy(sortColumn + " " + sortDirection);
                    }

                    // TODO:
                    // fix this

                    ////Search
                    if (!string.IsNullOrEmpty(searchValue))
                    {
                        query = query.Where(l => l.computer.Contains(searchValue) ||
                            l.@operator.Contains(searchValue));
                    }

                    //total number of rows count     
                    recordsTotal = query.Count();
                    //Paging     
                    var data = query.Skip(skip).Take(pageSize).ToList();

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

