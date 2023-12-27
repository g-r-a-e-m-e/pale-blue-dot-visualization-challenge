# Import packages
import datetime as dt
import pandas as pd
import os

# URL
url = 'https://data.giss.nasa.gov/gistemp/tabledata_v4/ZonAnn.Ts+dSST.csv'

# Retrieve data from URL
df = pd.read_csv(url)

# Save data to common data directory
data_dir = os.path.abspath(os.path.join(os.path.dirname( __file__ ), os.pardir, 'data'))
df.to_csv(f'{data_dir}/GISTEMP.csv',
          index = False)

# Get data of data extract
current_date = dt.datetime.now().strftime('%Y-%m-%d')

# Create citation
citation = f"""GISTEMP Team, 2023: GISS Surface Temperature Analysis (GISTEMP), version 4. NASA Goddard Institute for Space Studies. Dataset accessed {current_date} at https://data.giss.nasa.gov/gistemp/."""

# Write citation to file
with open('GISTEMP_citation.txt', 'w') as f:
    f.write(citation)
f.close()