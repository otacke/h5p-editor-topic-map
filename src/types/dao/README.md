# Data access object types

## Reasoning

We have created these DAO types as an abstraction layer between the editor and client applications. Before element positions and sizes are stored, we normalize them to a 100 by 100 grid. Therefore, the fields are aptly named e.g. `xPercentagePosition` to clearly state that the value is normalized.

## How to use

Because these are strictly DAO types, they should not be utilized within the application, but rather be used only in the service layer outside of the `App` component, i.e. the `H5PWrapper`.
