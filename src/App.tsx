import { A } from "./components/A.tsx";
import { Layout } from "./components/Layout.tsx";
import { Code } from "./components/Code.tsx";

export const App = () => {
  return (
    <Layout>
      <h1 className="text-center">Getting Started</h1>
      <div className="divider"></div>

      <h2 id="embedding_node">Embedding Node</h2>
      <p>
        Most popular form of integration is embedding{" "}
        <A href="https://github.com/mysteriumnetwork/node">node</A>.
      </p>
      <p>
        Node itself is a runnable binary and also serves HTTP API that allows
        full control. This section will list key steps to get you up to speed.
      </p>
      <p>
        You can also find a simple visual aid{" "}
        <A href="https://excalidraw.com/#json=PvGz1Ix-n65mkjPgt-h_f,-bn5TQuGMqVy5nlkEOX5hw">
          here
        </A>
        .
      </p>
      <div className="divider"></div>
      <h3 id="running_node">#1 Running Node</h3>
      <p>Run node using following command</p>
      <Code>
        {`sudo myst \\
        --vendor.id=__insert_partner_name__ \\
        service --agreed-terms-and-conditions`}
      </Code>
      <div className="divider"></div>
      <table className="table-auto table">
        <tbody>
          <tr>
            <td className="pr-4 font-bold">sudo</td>
            <td>
              required as node must have access to etherenet interfaces to
              configure VPN tunnel
            </td>
          </tr>
          <tr>
            <td className="pr-4 font-bold">vendor.id</td>
            <td>required for tracking which users were brought by partner</td>
          </tr>
          <tr>
            <td className="pr-4 font-bold">agreed-terms-and-conditions</td>
            <td>
              <b>
                <u>service</u>
              </b>{" "}
              command requires to agree to{" "}
              <A href="https://github.com/mysteriumnetwork/terms/blob/master/documents/TERMS_EXIT_NODE.md">
                TOS
              </A>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        One important thing that will happen when running{" "}
        <b>
          <u>service</u>
        </b>{" "}
        command - identity keystore will be created. You will need keystore ID
        string to register.
      </p>
      <h2 id="obtaining_identity_id_string">#2 Obtaining identity ID string</h2>
      <p>Few common ways to obtain identity using node http API.</p>
      <p>
        Note: when calling API from origin localhost (meaning on the same
        machine) you can use port 4050 to avoid authentication.
      </p>
      <ul>
        <li>
          <p>Get current selected identity by node</p>
          <Code>
            {`curl --request PUT \\
        --url http://localhost:4050/identities/current \\
        --header 'Content-Type: application/json' \\
        --data '{
        "passphrase": ""
      }'`}
          </Code>
        </li>
        <li>
          <p>Get all identities and take the first one.</p>
          <p>
            Note: node has legacy support for multiple identities there is no
            use-case for it - not used.
          </p>
          <Code>
            {`curl --request GET \\
  --url http://localhost:4050/identities`}
          </Code>
        </li>
      </ul>
      <h2 id="authenticate_with_sentinel">
        #3 Authenticate with provided credentials
      </h2>
      <p>
        In order to register node identity for free you must first authenticate
        with our user service (sentinel) - get the <b>auth_token</b>.
      </p>
      <Code>
        {`curl --request POST \\
        --url https://sentinel.mysterium.network/api/v1/auth/password \\
        --header 'Content-Type: application/json' \\
        --data '{
        "username": "__provided_username__",
        "password": "__provided_password__",
        "pool": "external"
      }'`}
      </Code>
      <h2 id="call_affiliator_service">#4 Call affiliator</h2>
      <p>Tell affiliator service which node identity to register for free.</p>
      <Code>
        {`curl --request POST \\
       --url https://affiliator.mysterium.network/api/v1/free-registration/partner \\
       --header 'Authorization: Bearer <auth_token>' \\
       --header 'Content-Type: application/json' \\
       --data '{
       "identity": "<identity_id_string_here>"
      }'`}
      </Code>
      <h2 id="register_node">#5 Register node</h2>
      <Code>{`curl 'http://localhost:4050/tequilapi/identities/<insert_identity_id_string>/register' \\
      --data-raw '{"beneficiary":"0x7254A32958c19ea064DbB32540E047818661cFCB","stake":0}'`}</Code>
      <table className="table-auto table">
        <tbody>
          <tr>
            <td className="pr-4 font-bold">beneficiary</td>
            <td>
              This is ERC20 compatible wallet that will receive earned MYST
              settlements. It is possible to change it after registration but we
              strongly advise to set it when registering
            </td>
          </tr>
          <tr>
            <td className="pr-4 font-bold">stake</td>
            <td>legacy feature - set it to 0</td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
};
