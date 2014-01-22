namespace IdProvider.Models
{
    using System.Runtime.Serialization;

    [DataContract]
    public class UserModel
    {
        [DataMember(Name = "id")]
        public string Id { get; set; }

        [DataMember(Name = "password")]
        public string Password { get; set; }

        [DataMember(Name = "rememberMe")]
        public bool RememberMe { get; set; }
    }
}