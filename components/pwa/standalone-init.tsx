/** Sets `html.app-standalone` before paint when running as an installed app. */
export function StandaloneInit() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var s=window.matchMedia("(display-mode: standalone)").matches||window.matchMedia("(display-mode: fullscreen)").matches||window.navigator.standalone===true;if(s)document.documentElement.classList.add("app-standalone")}catch(e){}})();`,
      }}
    />
  );
}
