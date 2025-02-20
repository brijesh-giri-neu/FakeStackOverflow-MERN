import FakeStackOverflow from "./components/fakestackoverflow";

import data from "./models/model";
import Application from "./models/application";

/**
 * The App component instantiates the model 
 * of @type {Application}
 * which encapsulates the application data
 * and operations to manipulate the data. 
 * The application data is passed to the FakeStackOverflow
 * @returns the root component of the application
 */

function App() {
    const app = Application.getInstance(data)
    return (
        <section className="fakeso">
            <FakeStackOverflow app={app} />
        </section>
    );
}

export default App;
