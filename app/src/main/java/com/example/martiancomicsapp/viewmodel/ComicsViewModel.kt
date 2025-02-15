package com.example.martiancomicsapp.viewmodel

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import com.example.martiancomicsapp.model.Comic

class ComicsViewModel : ViewModel() {
    // Dummy list of comics
    private val fullComicList = listOf(
        Comic(1, "Martian Adventures", "Action"),
        Comic(2, "Space Fantasy", "Fantasy"),
        Comic(3, "Galactic Horror", "Horror"),
        Comic(4, "Cosmic Mystery", "Mystery"),
        Comic(5, "Alien Invasion", "Action")
    )

    private val _comics = MutableStateFlow<List<Comic>>(fullComicList)
    val comics: StateFlow<List<Comic>> = _comics

    // Available filters (genres/themes)
    private val availableFilters = listOf("Action", "Fantasy", "Horror", "Mystery")
    
    // Expose filters as a simple list (read-only)
    fun getAvailableFilters(): List<String> = availableFilters

    // Selected filters (initially empty)
    private val _selectedFilters = MutableStateFlow<List<String>>(emptyList())
    val selectedFilters: StateFlow<List<String>> = _selectedFilters

    // Toggle filter selection
    fun toggleFilter(filter: String) {
        val current = _selectedFilters.value.toMutableList()
        if (current.contains(filter)) {
            current.remove(filter)
        } else {
            current.add(filter)
        }
        _selectedFilters.value = current
        applyFilters()
    }

    // Filter comics based on selected filters
    private fun applyFilters() {
        // If no filters are selected, show the full list.
        _comics.value = if (_selectedFilters.value.isEmpty()) {
            fullComicList
        } else {
            fullComicList.filter { comic ->
                _selectedFilters.value.contains(comic.genre)
            }
        }
    }
}

