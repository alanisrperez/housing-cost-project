# Project 3: Household Value & Employment Industries by CA County

Team Members:
Eduardo Almonte
Mark Bishoff
Alanis Perez
Nishi Thapliyal

Project Overview
---------------------
The focus of this project is to explore the relationship between median household values/costs & work industries across California counties. We aim to uncover trends in housing prices & industry distribution over the ~15 years, from 2010 to present. Housing costs in California have been rising at a significant rate over the past decade, making affordability a major issue for many residents. Understanding the factors that contribute to housing price increases is critical, & we believe that employment sectors play an important role. If certain industries are contributing to the economic affluence of particular counties, it could help explain why some areas are becoming less affordable while others remain accessible. By investigating these correlations, we aim to shed light on the patterns of economic forces shaping or influencing the housing market, which can inform discussions on housing policies, economic planning, & regional development in California.

Project Questions
---------------------
- How much has the median household value changed in each California county from 2010 to present day?
- Which California counties have the highest & lowest median household values?
- What are the most popular work industries in each California county?
- Do counties with higher median household costs have more people working in a specific industry than those who work in counties with lower median household costs? 

Resources & Data Wrangling
---------------------
Housing Data - Zillow Research — Median home value by county
- (https://www.zillow.com/research/data/)
- Dataset developed by Zillow. Original csv file includes 3074 entries across the timeframe of January 2004 to July 2024 across all 50 states. Each data entry reports the median housing cost per month.
- For this dataset, we started by reading in the CSV & filtering to only focus on counties in California. Since the dataset is structured to give us the median home value every month, we took an average of all months to create columns for every year from 2010 to 2014. Lastly, using only the new columns that give us the median average for the whole year, we exported the data to a JSON for further analysis.

![cleaning house data.png](https://github.com/alanisrperez/housing-cost-project/blob/Eddie/Eddie/Images/cleaning%20house%20data.png)
![cleaning house data2.png](https://github.com/alanisrperez/housing-cost-project/blob/Eddie/Eddie/Images/cleaning%20house%20data2.png)
![cleaning house data3.png](https://github.com/alanisrperez/housing-cost-project/blob/Eddie/Eddie/Images/cleaning%20house%20data3.png)


Employment by Industry Data — Employment numbers per industry by county
- (https://labormarketinfo.edd.ca.gov/data/employment-by-industry.html)
- Datasets developed by Employment Development Department (EDD) of the State of California, based on Current Employment Stats (CES) survey
-- Takes summary of monthly employment, hours, & earnings from a sample of CA employers, then adjusts data seasonally, & laslty makes final revisions to statewide & local area data based on payroll tax reports.
- For this dataset, we started by creating the categorizations of our industry main categories & subcategories, based on the formatting of indentations by row. Industry categorizations are based on the North American Industry Classification System (NAICS). We then selected the main categories to serve as our rows and included all subcategory data into the respective main category that it belongs to. This way, we can focus only on main categories. We created new files per county that show us this combined data. Using the combined data files, we created columns for each year from 2010 to 2024. Just like our other dataset that looked at median home value by county, this dataset was also set up to give an average number of people employed per month. So, we took an average for the year and created our new transformed data files. Lastly, we converted this data into a JSON. 

![additional cleaning.png](https://github.com/alanisrperez/housing-cost-project/blob/Eddie/Eddie/Images/additional%20cleaning.png)
![additional cleaning2.png](https://github.com/alanisrperez/housing-cost-project/blob/Eddie/Eddie/Images/additional%20cleaning2.png)


Dashboard & Visualizations
---------------------
To create an interactive page where users can sort through the data files & create visualizations based on selected counties, industries, and year, we started with an index html file that will create the structure and entry point for the Java Script code to run on. Next, was to create the Java Script.

![index html.png](https://github.com/alanisrperez/housing-cost-project/blob/Eddie/Eddie/Images/index%20html.png)
![index html2.png](https://github.com/alanisrperez/housing-cost-project/blob/Eddie/Eddie/Images/index%20html2.png)
![working script.js.png](https://github.com/alanisrperez/housing-cost-project/blob/Eddie/Eddie/Images/working%20script.js.png)

We wanted the visualizations to include the following:
- Map of California
-- Each county will be colored according to the median home value. This will vary by year as user adjusts the year slider.
- Scatterplot for number of employees in an industry by median home value
-- Based on selected year of interest
- Pie chart for all industries in a given county
-- Based on selected county of interest
- Bar chart for number of employees in an industry per county
-- Based on the selected industry of interest
- Line chart for median home value per county
-- Based on selected county of 

![Completed Dashboard.png](https://github.com/alanisrperez/housing-cost-project/blob/Eddie/Eddie/Images/Completed%20Dashboard.png)


Key Takeaways
---------------------
Here are a few interesting relationships we found*:
- There is an inverse relationship between median home value and mining/logging industries. This was most prevalanet in Kern County.
- There is a diretc relationshit between median home value and construction, information, financial activities, and business.
-- Construction is the most popular industry in Placer and Orange.
-- Information is the most popular industryin San Mateo, Santa Clara, and San Francisco.
-- Financial activities and Business are most popular industries in San Francisco.
* These changes can vary per year. These relationships were drawn over patterns that we noticed for many counties across different years. In this case, the above findings applied most in 2013.
Some of the more general findings across all years include:
- San Francisco, Marin, San Mateo, Alameda, Santa Clara, Santa Cruz, and Los Angeles are the most expensive counties for median home value.
-- The more expensive counties saw more increased rates of home prices compared to less expensive counties.
- Increased interest rates in 2022 correlate to increase of median house price in many counties.
So, what can we conclude from these findings?
- Depending on expanding industry type, this can increase cost of living for all. Like in the counties listed above, we see an increase of popular or upcoming industries and a raise in the cost of living. Now, this could potentially make for a fair trade off of successful expanding businesses and jobs that earn higher wages to a more enhanced style of living, reflected in our homes. On the other hand, this may poorly impact communities that live in that area but do not work in more popular industries.
- Looking at data like this can also give users an idea of what industries are growing and therefore more attractive to those seeking a career change. It can also help people determine what counties may be a good fit given the industry they work in. Users can see what counties have higher populations of employees working in different areas.

Data Limitations
---------------------
- Like all surveys, the dataset reporting industry employment numbers is subject to sampling & non-sampling errors.
- Each county reported work industry data differently and in some cases, inconsistently.
-- Some counties (e.g. Los Angeles, San Diego) report multiple subcategories which helps create a more in-depth dataset that accounts for several different industries. This can be very useful depending on the type of industry a user may be interested in. This variety is helpful in determining impact or influence of specific sectors.
-- Some counties (e.g. Sierra, Alpine) report industry data under “catch-all” categories (e.g. Goods Producing/Service Providing) which does not tell us a lot about the industries in those areas. Large and broad categories such as Service Providing can include a diversity of industries ranging from transportation, retail, warehousing, information, financial activities and more. There aren't many conclusions or findings that can be drawn from this lack of categorization and reporting.
-- Some counties may report different categories types. For example, some counties include "Mining, Logging, and Construction" as one main category with all related industries as subcategories. Other counties reported "Mining & Logging" and "Construction" as individual main categories both with their own set of subcategories. These inconsistencies can lead to different patterns in employment numbers.
- “Tech” as an industry classification
-- One industry that our team was interested in searching was tech, especially given how much it has grown over the past 20 years. However, this is a very broad industry. Tech can include manufacturing, support, & the research & development of computing, telecommunication, & consumer electronics. It can include tech products & services like digital electronics, software, optics, new energy storage, or internet services lisuch as cloud storage or e-commerce. So, because tech is so broad, it can fall under any of the categories defined by the NAICS, such as: manufacturing, retail, information, professional, scientific, & tech services, public administration, etc.
- Although it is not a limitation of the dataset itself, a rather large obstacle for data users is the inconsistency & messiness of the original data files.
-- There were many inconsistencies in the way categories were indented (to represent categories & subcategories). Some categories had a mix of tabs and indentations to determine categorization level. This mix and inconsistency in character codes made it difficult to properly iterate through lines of code. This is especially frustrating considering there were 58 files to sift through. Another inconsistency were some data rows being labelled differently even though they represent the same information. For example, some datasets had "Total, All Industries" where others had "Total, Wages & Salaries". Both rows represented the same type of data. Some industries used oxford commas where others did not, making iteration between commas also annoying to sift through.

Conclusion
---------------------
The exploration of the relationship between median household values and employment industries across California counties reveals important trends that highlight economic disparities and industry-specific influences on housing affordability. We observed that counties with higher median household values, such as San Francisco, Marin, and Santa Clara, are often driven by industries like information, financial activities, and construction, which are prevalent in wealthier regions. Conversely, counties with a stronger presence of industries like mining and logging, such as Kern County, tend to have lower median home values, suggesting an inverse relationship between certain industries and housing prices.
While some counties show clear correlations between specific industries and rising home prices, inconsistencies in data reporting and classification across counties pose challenges for making uniform comparisons. Additionally, the broad categorization of industries, particularly in sectors like technology, limits our ability to pinpoint the exact impact of fast-growing industries. These findings provide valuable insights for understanding the economic forces shaping housing markets in California, but also highlight the need for more standardized and detailed data collection to further refine our understanding.