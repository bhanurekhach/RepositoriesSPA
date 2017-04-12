using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RepositoriesSPA.Models;

namespace RepositoriesSPA.Controllers
{
    public class GetRepositoriesController : ApiController
    {
        
        public HttpResponseMessage GetUserByApi(string username)
        {
            JsonTextReader reader = null;
            int retries = 3;
            while (true)
            {
                try
                {
                    WebClient webClient = new WebClient();
                    JObject result = JObject.Parse(webClient.DownloadString("https://api.github.com/search/users?q=" + username));
                    reader = new JsonTextReader(new System.IO.StringReader(result.ToString()));
                    reader.SupportMultipleContent = true;
                    break;
                }
                catch (Exception ex)
                {
                    if (--retries == 0)
                        Request.CreateErrorResponse(HttpStatusCode.NotFound, " User name Not Found");
                    else
                        Request.CreateErrorResponse(HttpStatusCode.BadRequest, " Please check the username");
                }
            }
            
            //JObject jsonObject = JObject.FromObject(menuInfo);
            return Request.CreateResponse(HttpStatusCode.OK);

        }

        
    }
}
