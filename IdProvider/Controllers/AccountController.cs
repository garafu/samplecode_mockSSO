namespace IdProvider.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;

    public class AccountController : Controller
    {
        //
        // GET: /Account/Login

        public ActionResult Login()
        {
            return this.View();
        }

    }
}
