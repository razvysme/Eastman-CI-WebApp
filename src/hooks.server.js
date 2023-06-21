/** @type {import('@sveltejs/kit').Handle} */
export const hande = async(event, resolve) => 
{   
    console.log("An event has happened: " + event);
    console.log(event.cookies.get('usr'));
    const usr = event.cookies.get('usr');
    const response = await resolve(event, {
        transformPageChunk: ({ html }) =>
          html.replace('data-usr=""', `data-theme="${usr}"`),
      });
    return response;
};