# TODO: Implement Sector Content CRUD

## 1. Add SectorContent Type
- Add SectorContent interface to src/lib/types.ts with fields: id, sector_id, title, content, created_at

## 2. Extend useData Hook
- Modify src/lib/useData.ts to fetch from z_sector_a, z_sector_b, z_sector_c tables
- Combine data into SectorContent[] array
- Add sectorContent to the returned data

## 3. Add CRUD Functions
- Create src/lib/sectorContent.ts with functions:
  - fetchSectorContent(sector_id): fetch from specific table
  - addSectorContent(sector_id, title, content): insert into table
  - updateSectorContent(id, sector_id, title, content): update in table
  - deleteSectorContent(id, sector_id): delete from table

## 4. Modify Sectors Component
- Update src/components/Sectors.tsx to display content for each sector
- Add "Add Content" button for each sector
- Add edit/delete buttons for each content item

## 5. Add Content Modal
- Create a modal component for adding/editing content
- Include form fields: title, content
- Handle save/update actions

## 6. Integrate with App
- Update src/App.tsx to pass sectorContent to Sectors component
- Ensure data refreshes after CRUD operations
