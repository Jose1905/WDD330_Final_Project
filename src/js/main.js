import { loadHeaderFooter } from "./utils.mjs";
import { fetchRegions } from "./ExternalServices.mjs";

async function buildRegionList() {
    const regions = await fetchRegions();
    console.log(regions); // Log the regions to verify they are being fetched correctly
    const regionSelect = document.getElementById("region-select");
    regions.forEach(region => {
        const option = document.createElement("option");
        option.value = region;
        option.textContent = region.charAt(0).toUpperCase() + region.slice(1);
        regionSelect.appendChild(option);
    });
}

loadHeaderFooter();
buildRegionList();