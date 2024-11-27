import SimpleSlider from "../components/home/Slider";

export default function HomePage() {
  return (
    <div className="p-2 lg:p-4 h-full" data-testid="home-page-div">
      <SimpleSlider />
    </div>
  );
}
