namespace IdProvider.Models
{
    using System.Runtime.Serialization;

    [DataContract]
    public class LoginResultModel
    {
        [DataMember(Name = "isSuccess")]
        public bool IsSuccess { get; set; }

        [DataMember(Name = "message")]
        public string Message { get; set; }
    }
}