export default defineEventHandler(async (event) => {
  const apiBase = "https://api.hubapi.com/crm/v3";
  const apiToken = useRuntimeConfig(event).hubspotAPI;
  const properties = [
    "title",
    "firstname",
    "lastname",
    "email",
    "mobilephone",
    "phone",
    "abn",
    "salestrekker_id",
    "wlth_id",
    "linkedin_url",
    "wlth_contact_owner",
  ];
  const headers = {
    Accept: "application/json",
    Authorization: apiToken,
  };
  const url = `${apiBase}/objects/contacts/d.hebdon@wlth.com?idProperty=email&properties=${properties.toString()}`;
  const user = $fetch(url, { method: "GET", headers });
  return user;
});
