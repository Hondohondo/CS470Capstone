using System.Web;
using System.Web.Optimization;

namespace CCFLoggingConfig
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery.datatables.js",
                        "~/Scripts/dataTables.bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/bootstrap.css")
                      .Include("~/Content/site.css")
                      .Include("~/Content/css/datatables/css/dataTables.bootstrap.css"));

            //bundle for home 
            bundles.Add(new ScriptBundle("~/bundles/home").Include(
                "~/Content/scripts/Home/Home.API.js","~/Content/scripts/Home/Home.js"));

            //bundle for log
            bundles.Add(new ScriptBundle("~/bundles/log").Include(
                "~/Content/scripts/Log/Log.API.js", "~/Content/scripts/Log/Log.js"));

            //bundle for configuration
            bundles.Add(new ScriptBundle("~/bundles/configuration").Include(
                "~/Content/scripts/Configuration/Configuration.API.js", "~/Content/scripts/Configuration/Configuration.js"));

            //bundle for configuration
            bundles.Add(new ScriptBundle("~/bundles/sysssislog").Include(
                "~/Content/scripts/Sysssislog/Sysssislog.API.js", "~/Content/scripts/Sysssislog/Sysssislog.js"));

            //bundle for configuration
            bundles.Add(new ScriptBundle("~/bundles/ssis_configuration").Include(
                "~/Content/scripts/SSIS_Configuration/SSIS_Configuration.API.js", "~/Content/scripts/SSIS_Configuration/SSIS_Configuration.js"));


        }
    }
}
