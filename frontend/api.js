import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes as Methods

  // COMPANY ROUTES

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies(query) {
    let queryString = '';
    for (let key in query) {
      if (query[key]) {
        queryString += `${key}=${query[key]}&`;
      }
    }
    let res = await this.request(`companies?${queryString}`);
    return res.companies;

  }

  static async addCompany(companyDetails) {
    let res = await this.request(`companies`, companyDetails, "post");
    return res.company;
  }

  static async updateCompany(handle, companyDetails) {
    let res = await this.request(`companies/${handle}`, companyDetails, "patch");
    return res.company;
  }

  static async deleteCompany(handle) {
    let res = await this.request(`companies/${handle}`, {}, "delete");
    return res;
  }

  // JOB ROUTES

  static async addJob(jobDetails) {
    let res = await this.request(`jobs`, jobDetails, "post");
    return res.job;
  }

  static async getJobs(query) {
    let queryString = '';
    for (let key in query) {
      if (query[key]) {
        queryString += `${key}=${query[key]}&`;
      }
    }
    let res = await this.request(`jobs?${queryString}`);
    return res.jobs;
  }

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  static async updateJob(id, jobDetails) {
    let res = await this.request(`jobs/${id}`, jobDetails, "patch");
    return res.job;
  }

  static async deleteJob(id) {
    let res = await this.request(`jobs/${id}`, {}, "delete");
    return res;
  }

  // USER ROUTES

  static async addUser(userDetails) {
    let res = await this.request(`users`, userDetails, "post");
    return res.user;
  }

  static async getUsers() {
    let res = await this.request(`users`);
    return res.users;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async editUser(username, userDetails) {
    let res = await this.request(`users/${username}`, userDetails, "patch");
    return res.user;
  }

  static async deleteUser(username) {
    let res = await this.request(`users/${username}`, {}, "delete");
    return res;
  }

  static async applyJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res;
  }

}

// for now, put token ("testuser" / "password" on class)

//admin
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4ODU4Mzk3Nn0.ZBR8jwDGH9FeznZwvCzUh7PMRAKfcWDKyDNlkRpM56E";

// normal user
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

// JoblyApi.getCompanies({ "minEmployees": 820, "maxEmployees": 850 }).then(res => console.log(res)).catch(e => console.log(e));
// JoblyApi.addCompany({ "name": "testCompany", "handle": "test-co", "description": "test desc", "numEmployees": 10 }).then(res => console.log(res)).catch(e => console.log(e));
// JoblyApi.updateCompany('test-co', { "name": "testCompanyy", "description": "test desc2", "numEmployees": 11 }).then(res => console.log(res)).catch(e => console.log(e));
// JoblyApi.getCompany('test-co').then(res => console.log(res)).catch(e => console.log(e));
// JoblyApi.deleteCompany('test-co').then(res => console.log(res)).catch(e => console.log(e));
// JoblyApi.addJob({ "title": "testtitle", "salary": 100, "equity": ".5", "companyHandle": "test-co" }).then(res => console.log(res)).catch(e => console.log(e));
// JoblyApi.getJobs({ "title": "test" }).then(res => console.log(res)).catch(e => console.log(e));
// JoblyApi.getJob(202).then(res => console.log(res)).catch(e => console.log(e));
// JoblyApi.updateJob(202, { "title": "testtitle2", "salary": 1002, "equity": ".52" }).then(res => console.log(res)).catch(e => console.log(e));
// JoblyApi.deleteJob(202).then(res => console.log(res)).catch(e => console.log(e));
JoblyApi.getUser("testuser3", 199).then(res => console.log(res)).catch(e => console.log(e));