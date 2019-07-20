![](static/public/campfire.png)

![](https://travis-ci.org/MiroFurtado/campfire.svg?branch=master)

### general development strategy

The general development strategy for campfire is to create a functional system for loading torchscript models in an easy way on something like an AWS EC2 instance and then to slowly strip away and optimize so it can be released and executed in a single line on a Google Colab notebook or something similarly lightweight and accessible.

