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

            //bundle for logs
            bundles.Add(new ScriptBundle("~/bundles/logs").Include(
                "~/Content/scripts/Logs/Logs.API.js", "~/Content/scripts/Logs/Logs.js"));

            //bundle for config
            bundles.Add(new ScriptBundle("~/bundles/config").Include(
                "~/Content/scripts/Config/Config.API.js", "~/Content/scripts/Config/Config.js"));
        }

        public class CssRewriteUrlTransformWrapper : IItemTransform
        {
            public string Process(string includedVirtualPath, string input)
            {
                return new CssRewriteUrlTransform().Process("~" + VirtualPathUtility.ToAbsolute(includedVirtualPath), input);
            }
        }
    }
}
