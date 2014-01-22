namespace ServiceProvider1
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Http;
    using System.Web.Mvc;
    using System.Web.Routing;
    using System.Web.Security;
    using System.Security.Principal;

    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {
            // 認証情報を格納した Cookie を取得
            var authCookie = this.Request.Cookies[FormsAuthentication.FormsCookieName];

            // Cookie が 存在する場合
            if (authCookie != null && !string.IsNullOrEmpty(authCookie.Value))
            {
                // Cookie から 認証情報 を復元
                var ticket = FormsAuthentication.Decrypt(authCookie.Value);
                var identity = new GenericIdentity(ticket.Name, "Single Sing-On");
                var pricinpal = new GenericPrincipal(identity, new string[] { });
                HttpContext.Current.User = pricinpal;
            }
        }

        protected void Application_EndRequest(object sender, EventArgs e)
        {
            var url = string.Empty;

            // 401:Unauthorized でない場合、何もしない
            if (this.Response.StatusCode != 401)
            {
                return;
            }

            // リダイレクト用の URL を生成
            url += "http://localhost:8080/Account/Login";
            url += "?ReturnUrl=";
            url += HttpUtility.UrlEncode(this.Request.Url.ToString());

            // リダイレクト
            this.Response.Redirect(url);
        }
    }
}