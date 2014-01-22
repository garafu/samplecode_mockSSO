namespace IdProvider.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;
    using System.Web.Security;
    using Models;

    public class AuthenticationController : ApiController
    {
        //
        // POST: /api/authentication/signin

        [HttpPost]
        public HttpResponseMessage SignIn(UserModel model)
        {
            if (model != null && model.Id == "hoge" && model.Password == "hoge")
            {
                FormsAuthentication.SetAuthCookie(model.Id, model.RememberMe);

                return this.Request.CreateResponse(HttpStatusCode.OK, new LoginResultModel()
                {
                    IsSuccess = true,
                    Message = "ログインに成功しました。"
                });
            }
            else
            {
                return this.Request.CreateResponse(HttpStatusCode.Accepted, new LoginResultModel()
                {
                    IsSuccess = false,
                    Message = "ID または パスワード が違います。"
                });
            }
        }


        //
        // POST: /api/authentication/signout

        [HttpPost]
        public HttpResponseMessage SignOut()
        {
            FormsAuthentication.SignOut();
            return this.Request.CreateResponse(HttpStatusCode.OK);
        }

    }
}
