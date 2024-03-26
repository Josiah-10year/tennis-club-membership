
export default async function Register() {
  return (
    <div className="relative">
      <div className="w-full h-[400px] relative">
      </div>
      <div className="max-w-7xl mx-auto mt-[-120px] relative bg-white px-8 sm:px-20">
        <h1 className="text-center py-8 font-site">Register</h1>
        <div className="max-w-4xl mx-auto">
          <form className="border-2 border-blue-site p-8">
          <h3 className="font-site text-lg my-3">Account Details</h3>
            <div className="flex flex-col sm:flex-row sm:gap-12">
              <div className="basis-1/2">
                <label className="text-xs" htmlFor="name">
                  First Name *
                </label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  id="name"
                  required={true}
                />
                <label className="text-xs" htmlFor="email">
                  Email Address*
                </label>
                <input
                  className="input"
                  type="email"
                  name="email"
                  id="email"
                  required={true}
                />
                <label className="text-xs" htmlFor="password">
                  Password *
                </label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  id="password"
                  required={true}
                />
              </div>
              <div className="basis-1/2">
                <label className="text-xs" htmlFor="name">
                  Last Name *
                </label>
                <input 
                  className="input" 
                  type="text" 
                  name="last" 
                  id="last"
                  required={true}
                />
                <label className="text-xs" htmlFor="phone">
                  Phone Number*
                </label>
                <input 
                  className="input" 
                  type="tel" 
                  name="phone" 
                  id="phone"
                  required={true} 
                />
              </div>
            </div>
            {/* <label className="text-xs" htmlFor="address">
              Address
            </label>
            <input 
              className="input" 
              type="text" 
              name="address" 
              id="address" /> */}
            {/* <button className="btn-main w-full mt-6 text-xl" type="submit">
              Apply
            </button> */}
            <h3 className="font-site text-lg my-3">Profile Setup</h3>
            <div className="flex flex-col sm:flex-row sm:gap-12">
              <div className="basis-1/2">
                <label className="text-xs" htmlFor="avatar">
                  Avatar
                </label>
                <input
                  className="input"
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  capture
                  placeholder="Image"
                />
                <label className="text-xs" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  className="input"
                  name="bio"
                  id="bio"
                  maxLength={250}
                  cols={50}
                  rows={4}
                  style={{resize: 'none', borderWidth: '1px'}}
                />
              </div>
              <div className="basis-1/2">
                <label className="text-xs" htmlFor="subscriptions">
                  Topic Subscriptions
                </label>
                <br></br>
                <input
                  // className="input"
                  type="checkbox"
                  name="subscription"
                  id="subscription"
                  multiple
                />
                <label htmlFor="subscription">Sample Topic</label>
                <br></br>
                Fetch topics from Sanity and display as checkbox options
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-12">
            <label className="text-xs" htmlFor="interests">
                  Interests
                </label>
                <br></br>
                <span className="tag-cloud">Sample Interest</span>
                <br></br>
                Fetch interests from Sanity and display as selectable tags
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-12">
              <div className="basis-1/2">
                <button className="btn-sec w-full mt-6 text-xl" type="reset">
                  Clear Form
                </button>
              </div>
              <div className="basis-1/2">
                <button className="btn-main w-full mt-6 text-xl" type="submit">
                  Submit Form
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}