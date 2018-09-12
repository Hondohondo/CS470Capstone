using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CCFLoggingConfig.Controllers
{
    public class HomeController : Controller
    {

        [HttpPost]
        public JsonResult GetHelloWorld(string first)
        {

            using (var db = new logconfigEntities1())
            {
                var result = db.Logs.Single();
            }

                var second = "World";

            return Json(first+second);
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}