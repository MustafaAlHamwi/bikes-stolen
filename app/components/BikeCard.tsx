/* eslint-disable @next/next/no-img-element */
interface Bike {
  id: number;
  title: string;
  frame_model: string;
  manufacturer_name: string;
  year: number;
  frame_colors: string[];
  serial: string;
  status: string;
  stolen: boolean;
  date_stolen: number | null;
  stolen_location: string | null;
  location_found: string | null;
  description: string | null;
  large_img: string | null;
  url: string;
  propulsion_type_slug: string;
  cycle_type_slug: string;
}
const BikeCard = ({ bike }: { bike: Bike }) => {
  return (
    <article className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1  mx-auto flex items-center align-middle ">
          <img
            src={bike.large_img || "/bike.png"}
            alt={bike.title}
            className=" h-[150px] object-cover rounded-lg"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/bike.png";
            }}
          />
        </div>

        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold">{bike.title}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Manufacturer:</p>
              <p>{bike.manufacturer_name}</p>
            </div>
            {bike.date_stolen && (
              <div>
                <p className="font-semibold">Date Stolen:</p>
                <p>
                  {new Date(bike.date_stolen * 1000).toLocaleDateString(
                    "en-US",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>
            )}
            <div>
              <p className="font-semibold">Status:</p>
              <p
                className={`capitalize ${
                  bike.stolen ? "text-red-600" : "text-green-600"
                }`}
              >
                {bike.status}
              </p>
            </div>
            <div>
              <p className="font-semibold">Colors:</p>
              <p>{bike.frame_colors.join(", ")}</p>
            </div>
            {bike.stolen && bike.stolen_location && (
              <div className="col-span-2">
                <p className="font-semibold">Location:</p>
                <p>{bike.stolen_location}</p>
              </div>
            )}
            {!bike.stolen && bike.location_found && (
              <div className="col-span-2">
                <p className="font-semibold">Found At:</p>
                <p>{bike.location_found}</p>
              </div>
            )}
            {bike.description && (
              <div className="col-span-2">
                <p className="font-semibold">Description:</p>
                <p className="line-clamp-2 text-gray-600">{bike.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
export default BikeCard;
