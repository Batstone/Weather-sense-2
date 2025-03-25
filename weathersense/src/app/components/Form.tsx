import Button from "./Button";

export default function Form() {
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const city = (event.target as HTMLFormElement).city.value;
    console.log(city);
  }

  return (
    <div>
      <form>
        <fieldset>
          <legend>Search for the weather information for your city</legend>
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" />
          <Button onClick={handleSubmit} type="submit">
            Search
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
