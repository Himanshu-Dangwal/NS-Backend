const fs = require("fs");
const express = require("express");
const dotenv = require("dotenv");
const resources = JSON.parse(fs.readFileSync(`${__dirname}/data/resources.json`));

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Define resource routes
app.get("/resources", filterResources);
app.get("/resources/sort", sortResources);
app.get("/resources/group", groupResources);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function filterResources(req, res) {
  const { category } = req.query;
  let filteredResources = resources;

  if (category) {
    filteredResources = filteredResources.filter(
      (resource) => resource.category === category
    );
  }

  res.json(filteredResources);
}

function sortResources(req, res) {
  const { sortBy } = req.query;
  let sortedResources = [...resources];

  if (sortBy === "name") {
    sortedResources.sort((a, b) => a.name.localeCompare(b.name));
  }

  res.json(sortedResources);
}

function groupResources(req, res) {
  const groupedResources = resources.reduce((acc, resource) => {
    const { category } = resource;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(resource);
    return acc;
  }, {});

  res.json(groupedResources);
}

module.exports = { app, server }; // Export both app and server